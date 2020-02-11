import EquipmentItem from '../characterDefaults/EquipmentItem';

export default {
   addItem(state) {
      const newItem = new EquipmentItem();
      state.equipment = [...state.equipment, newItem];
      return newItem;
   },

   removeItem(state, { id }) {
      const index = state.equipment.findIndex(item => item.id === id);
      const newEquipment = [...state.equipment];
      newEquipment.splice(index, 1);
      state.equipment = newEquipment;
   },

   editItem(state, { name, value, id }) {
      let newValue = value;
      const index = state.equipment.findIndex(item => item.id === id);

      if (name === 'location' && value === state.equipment[index].location) {
         newValue = '';
      }
      const newEquipment = [...state.equipment];
      newEquipment[index][name] = newValue;

      state.equipment = newEquipment;
   },
};
