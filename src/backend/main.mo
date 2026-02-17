import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    isPremium : Bool;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management (Required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Premium Status Management
  public shared ({ caller }) func upgradeToPremium() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upgrade to Premium");
    };

    // Get existing profile or create new one
    let existingProfile = userProfiles.get(caller);
    let updatedProfile = switch (existingProfile) {
      case (null) {
        { name = ""; isPremium = true };
      };
      case (?profile) {
        { name = profile.name; isPremium = true };
      };
    };
    userProfiles.add(caller, updatedProfile);
  };

  public shared ({ caller }) func downgradeFromPremium(user : Principal) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can downgrade users from Premium");
    };

    // Get existing profile
    let existingProfile = userProfiles.get(user);
    switch (existingProfile) {
      case (null) {
        // User has no profile, nothing to downgrade
      };
      case (?profile) {
        let updatedProfile = { name = profile.name; isPremium = false };
        userProfiles.add(user, updatedProfile);
      };
    };
  };

  public query ({ caller }) func isCurrentUserPremium() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check Premium status");
    };

    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) { profile.isPremium };
    };
  };

  public query ({ caller }) func isUserPremium(user : Principal) : async Bool {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only check your own Premium status");
    };

    switch (userProfiles.get(user)) {
      case (null) { false };
      case (?profile) { profile.isPremium };
    };
  };
};
