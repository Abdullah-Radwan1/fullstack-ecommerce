import { Size } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

type cartItem = {
  name: string;
  id: string;
  image: string;
  quantity: number;
  basePrice: number;
  sizes: Size[];
};
type allCartItems = {
  items: cartItem[];
};
const initialState: allCartItems = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
//ds
