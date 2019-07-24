import { UPDATE_NET_WORK, GET_CLASSIFY } from "../constants/common";

const INITIAL_STATE = {
  networkStatus: true,
  classify: []
};

export default function circle(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_NET_WORK: {
      return {
        ...state,
        networkStatus: action.status
      };
    }
    case GET_CLASSIFY: {
      return {
        ...state,
        classify: action.payload.data
      };
    }
    default:
      return state;
  }
}
