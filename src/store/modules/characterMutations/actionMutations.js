import Action from '../characterDefaults/Action';

export default {
   addAction(state) {
      state.actions = [...state.actions, new Action()];
   },

   removeAction(state, id) {
      const actionIndex = state.actions.findIndex(action => action.id === id);
      const newActions = [...state.actions];
      newActions.splice(actionIndex, 1);
      state.actions = newActions;
   },
};
