import UpdateFieldPropertiesMethod from '../../../../../types/components/forms/input/content/imagePicker/UpdateFieldPropertiesMethod';

const reset = (updateFieldPropertiesMethod: UpdateFieldPropertiesMethod) => {
  updateFieldPropertiesMethod({
    removed: [],
    added: [],
  });
};

export default reset;
