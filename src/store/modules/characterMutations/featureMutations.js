import shortId from '@/utils/generateId';

const initialFeature = {
   title: '',
   content: '',
   id: '',
};

export default {
   addFeature(state, type = 'entry') {
      const newFeature = {
         ...initialFeature,
         type,
         id: shortId(),
      };

      if (type === 'counter') {
         newFeature.value = 0;
         newFeature.max = 0;
      }

      state.features = [...state.features, newFeature];
   },

   editFeature(state, { name, value, id }) {
      const index = state.features.findIndex(feature => feature.id === id);
      const newFeatures = [...state.features];
      newFeatures[index][name] = value;
      state.features = newFeatures;
   },

   updateFeaturesOrder(state, newList) {
      state.features = newList;
   },

   removeFeature(state, id) {
      const newFeatures = [...state.features];
      const index = newFeatures.findIndex(f => f.id === id);
      newFeatures.splice(index, 1);
      state.features = newFeatures;
   },
};
