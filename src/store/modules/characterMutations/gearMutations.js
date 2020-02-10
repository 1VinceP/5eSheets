import EquipmentItem from '../../EquipmentItem';

export default {
   addItem(state) {
      state.equipment = [...state.equipment, new EquipmentItem()];
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
