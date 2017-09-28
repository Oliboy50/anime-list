import * as namespaces from '~/assets/js/const/store/namespaces';
import {
  SET,
  ADD_ITEM,
  UPDATE_ITEM,
  MOVE_ITEM,
  REMOVE_ITEM,
} from '~/assets/js/common/base-mutations';

export const SET_LIST_ITEMS = `${namespaces.LIST}${SET}items`;
export const ADD_ITEM_LIST_ITEMS = `${namespaces.LIST}${ADD_ITEM}items`;
export const UPDATE_ITEM_LIST_ITEMS = `${namespaces.LIST}${UPDATE_ITEM}items`;
export const MOVE_ITEM_LIST_ITEMS = `${namespaces.LIST}${MOVE_ITEM}items`;
export const REMOVE_ITEM_LIST_ITEMS = `${namespaces.LIST}${REMOVE_ITEM}items`;
