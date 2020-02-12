import WeaponAction from '../characterDefaults/WeaponAction';
import OtherAction from '../characterDefaults/OtherAction';

export default {
   addAction(state, { actionTime, actionType }) {
      const newAction = actionType === 'weapon'
         ? new WeaponAction(actionTime)
         : new OtherAction(actionTime);
      state[actionTime] = [...state[actionTime], newAction];
   },

   removeAction(state, { actionTime, id }) {
      const confirmed = window.confirm('This action will be gone forever.');
      if (confirmed) {
         const actionIndex = state[actionTime].findIndex(action => action.id === id);
         const newActions = [...state[actionTime]];
         newActions.splice(actionIndex, 1);
         state[actionTime] = newActions;
      }
   },

   editAction(state, { actionTime, id, prop, value }) {
      const actionIndex = state[actionTime].findIndex(action => action.id === id);
      state[actionTime][actionIndex][prop] = value;
   },
};
