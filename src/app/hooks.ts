import * as reactRedux from 'react-redux';
import type { RootState, AppDispatch } from 'app/store';

export const useDispatch = () => reactRedux.useDispatch<AppDispatch>();
export const useSelector: reactRedux.TypedUseSelectorHook<RootState> = reactRedux.useSelector;
