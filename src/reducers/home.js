import { GET_SWIPER, GET_HOT_CLASSIFY, GET_ACCOMPANY_LIST } from "../constants/home";

const INITIAL_STATE = {
  swiper: [],
  classify: [],
  accompany: []
};

export default function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SWIPER: {
      return {
        ...state,
        swiper: action.payload.data
      }
    }
    case GET_HOT_CLASSIFY: {
      return {
        ...state,
        classify: action.payload.data
      }
    }
    case GET_ACCOMPANY_LIST: {
      return {
        ...state,
        accompany: action.payload.data
      }
    }
    default:
      return state;
  }
}
