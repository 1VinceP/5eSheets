import Friend, { FriendAbility } from '../characterDefaults/Friend';

function friendIndex(state, id) {
   return state.friends.findIndex(f => f.id === id);
}

export default {
   updateFriendAbilitiesOrder(state, { id, newList }) {
      const index = friendIndex(state, id);
      state.friends[index].abilities = newList;
   },

   addFriend(state) {
      state.friends = [...state.friends, new Friend()];
   },

   deleteFriend(state, id) {
      const index = friendIndex(state, id);
      const newFriends = [...state.friends];
      newFriends.splice(index, 1);
      state.friends = newFriends;
   },

   editFriend(state, { id, prop, value }) {
      const index = friendIndex(state, id);
      state.friends[index][prop] = value;
   },

   editFriendScore(state, { id, prop, value }) {
      const index = friendIndex(state, id);
      state.friends[index].abilityScores[prop] = value;
   },

   addFriendAbility(state, id) {
      const index = friendIndex(state, id);
      state.friends[index].abilities = [...state.friends[index].abilities, new FriendAbility()];
   },

   editFriendAbility(state, { id, abilityId, prop, value }) {
      const fIndex = friendIndex(state, id);
      const aIndex = state.friends[fIndex].abilities.findIndex(a => a.id === abilityId);
      state.friends[fIndex].abilities[aIndex][prop] = value;
   },

   removeFriendAbility(state, { id, abilityId }) {
      const fIndex = friendIndex(state, id);
      const aIndex = state.friends[fIndex].abilities.findIndex(a => a.id === abilityId);
      const newAbilities = [...state.friends[fIndex].abilities];
      newAbilities.splice(aIndex, 1);
      state.friends[fIndex].abilities = newAbilities;
   },
};
