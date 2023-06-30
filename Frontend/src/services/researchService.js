import axiosClient from './axiosClient';
import { Platform } from 'react-native';
import * as mime from 'react-native-mime-types';

const BASE_URL = 'https://mazii.net/api/';

const headerConfig = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

class ResearchService {
  getVocabByName(name) {
    return axiosClient.post(BASE_URL + 'search', {
      type: 'kanji',
      query: name,
      dict: 'javi',
    });
  }

  postCanvas(uploadKey, imageUri) {
    let filename = imageUri.split('/').pop();
    let type = mime.lookup(imageUri);
    const formData = new FormData();
    formData.append(uploadKey, {
      uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
      type: type,
      name: filename,
    });
    return axiosClient.post('api/v1/research', formData, headerConfig);
  }
}

export default new ResearchService();

// export const createFormDataFromUri = (uploadKey, imageUri) => {
//   let filename = imageUri.split('/').pop()
//   let type = mime.lookup(imageUri)

//

//   formData.append(uploadKey, {
//       uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
//       type: type,
//       name: filename,
//   })

//   return formData
