import shortId from '@/utils/generateId';

const initialFeature = {
   title: '',
   content: '',
   id: '',
};

export default {
   addFeature(state) {
      state.features = [...state.features, { ...initialFeature, id: shortId() }];
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
};
