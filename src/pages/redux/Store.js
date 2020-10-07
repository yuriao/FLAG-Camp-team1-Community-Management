import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../../pages/redux/Reducer';

const store = configureStore({ reducer: loginReducer});

export default store;