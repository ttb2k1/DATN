const initData = {
  openCanvas: false,
};

export default appReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case 'OPEN_CANVAS':
      return {
        ...state,
        openCanvas: payload.openCanvas,
      };
    default:
      return state;
  }
};
