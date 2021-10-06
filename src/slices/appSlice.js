import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addInStorage } from "../Utils/StorageManager/StorageManager";

export const PENDING = 'pending';
export const IDLE = 'idle';
export const ERROR = 'error';

const initialState = {
    topSales: {
        items: [],
        status: PENDING,
    },
    catalog: {
        items: [],
        status: PENDING,
    },
    categories: {
        items: [],
        status: PENDING,
        activeCategory: 'all',
    },
    catalogItems: {
        items: [],
        status: PENDING,
    },
    loadMore: {
        status: IDLE,
        isOver: false,
        offset: 6,
    },
    search: {
        searchField: '',
    },
    selectedItem: {
        item: {},
        status: PENDING,
    },
    cart: {
        items: [],
        status: IDLE,
        orderAccepted: false,
    }
};

export const getTopSales = createAsyncThunk('getTopSales', async () => {
    const response = await fetch(`${process.env.REACT_APP_TOP_SALES_URL}`);
    const data = await response.json();
    return data;
});

export const getCatalog = createAsyncThunk('getCatalog', async () => {
    const response = await fetch(`${process.env.REACT_APP_TOP_SALES_URL}`);
    const data = await response.json();
    return data;
});

export const getCatrgories = createAsyncThunk('getCatrgories', async () => {
    const response = await fetch(`${process.env.REACT_APP_CATEGORIES}`);
    const data = await response.json();
    return data;
});

export const getAllItems = createAsyncThunk('getAllItems', async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}api/items`);
    const data = await response.json();
    return data;
});

export const getItemsById = createAsyncThunk('getItemsById', async (id) => {
    const response = await fetch(`${process.env.REACT_APP_URL}api/items?categoryId=${id}`);
    const data = await response.json();
    return data;
});

export const getMoreItemsById = createAsyncThunk('getMoreItemsById', async (obj) => {
    console.log(obj.offset)
    const response = await fetch(`${process.env.REACT_APP_URL}api/items?categoryId=${obj.categoryId}&offset=${obj.offset}`);
    const data = await response.json();
    return data;
});

export const getMoreItms = createAsyncThunk('getMoreItms', async (offset) => {
    const response = await fetch(`${process.env.REACT_APP_URL}api/items?offset=${offset}`);
    const data = await response.json();
    return data;
});

export const searchItem = createAsyncThunk('searchItem', async (obj) => {
    const {value, offset} = obj;
    const params = new URLSearchParams();
    params.append('q', value)
    params.append('offset', offset)
    const response = await fetch(`${process.env.REACT_APP_URL}api/items?${params}`);
    const data = await response.json();
    return data;
});

export const getItemById = createAsyncThunk('getItemById', async (id) => {
    const response = await fetch(`${process.env.REACT_APP_URL}api/items/${id}`);
    const data = await response.json();
    return data;
});

export const postItems = createAsyncThunk('postItems', async (obj) => {
    const { items, form } = obj;
    const { phone, address } = form;
    const arr = items.map((el) => {
        return {
            id: el.item.id,
            price: el.item.price,
            count: el.quantity,
        }
    });
    console.log(arr, phone, address)
    const response = await fetch(`${process.env.REACT_APP_URL}api/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owner: {
                phone: String(phone),
                address: String(address),
            },
            items: arr
        }),
    });
    console.log(response);
});

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setActiveCategory: (state, action) => {
            state.loadMore.isOver = false;
            state.loadMore.offset = 6;
            state.categories.activeCategory = action.payload;
        },
        upOffset: (state) => {
            state.loadMore.offset += 6;
        },
        resetOffset: (state) => {
            state.loadMore.offset = 6;
        },
        input: (state, action) => {
            state.search.searchField = action.payload;;
        },
        addToCart: (state, action) => {
            state.cart.items.push(action.payload);
            addInStorage(state.cart.items);
        },
        removeFromCart: (state, action) => {
            const { id, size } = action.payload;
            state.cart.items = state.cart.items.filter((el) => {
                if (el.size !== size && el.item.id !== id) return el;
            });
            addInStorage(state.cart.items);
        },
        initStorage: (state, action) => {
            state.cart.items = action.payload;
        },
        resetCart: (state) => {
            state.cart.items = [];
            addInStorage(state.cart.items);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTopSales.pending, (state) => {
                state.topSales.status = PENDING;
            })
            .addCase(getTopSales.fulfilled, (state, action) => {
                state.topSales.items = action.payload;
                state.topSales.status = IDLE;
            })
            .addCase(getTopSales.rejected, (state) => {
                state.topSales.status = ERROR;
            })
            .addCase(getCatalog.pending, (state) => {
                state.catalog.status = PENDING;
            })
            .addCase(getCatalog.fulfilled, (state, action) => {
                state.catalog.items = action.payload;
                state.catalog.status = IDLE;
            })
            .addCase(getCatalog.rejected, (state) => {
                state.catalog.status = ERROR;
            })
            .addCase(getCatrgories.pending, (state) => {
                state.categories.status = PENDING;
            })
            .addCase(getCatrgories.fulfilled, (state, action) => {
                state.categories.items = action.payload;
                state.categories.status = IDLE;
            })
            .addCase(getCatrgories.rejected, (state) => {
                state.categories.status = ERROR;
            })
            .addCase(getAllItems.pending, (state) => {
                state.catalogItems.status = PENDING;
            })
            .addCase(getAllItems.fulfilled, (state, action) => {
                if (action.payload.length < 6 || action.payload.length === 0) {
                    state.loadMore.isOver = true;
                };
                state.catalogItems.items = action.payload;
                state.catalogItems.status = IDLE;
            })
            .addCase(getAllItems.rejected, (state) => {
                state.catalogItems.status = ERROR;
            })
            .addCase(getItemsById.pending, (state) => {
                state.catalogItems.status = PENDING;
            })
            .addCase(getItemsById.fulfilled, (state, action) => {
                if (action.payload.length < 6 || action.payload.length === 0) {
                    state.loadMore.isOver = true;
                };
                state.catalogItems.items = action.payload;
                state.catalogItems.status = IDLE;
            })
            .addCase(getItemsById.rejected, (state) => {
                state.catalogItems.status = ERROR;
            })
            .addCase(getMoreItms.pending, (state) => {
                state.loadMore.status = PENDING;
            })
            .addCase(getMoreItms.fulfilled, (state, action) => {
                if (action.payload.length < 6 || action.payload.length === 0) {
                    state.loadMore.isOver = true;
                };
                state.catalogItems.items = state.catalogItems.items.concat(action.payload);
                state.loadMore.status = IDLE;
            })
            .addCase(getMoreItms.rejected, (state) => {
                state.loadMore.status = ERROR;
            })
            .addCase(getMoreItemsById.pending, (state) => {
                state.loadMore.status = PENDING;
            })
            .addCase(getMoreItemsById.fulfilled, (state, action) => {
                console.log(action.payload)
                if (action.payload.length < 6 || action.payload.length === 0) {
                    state.loadMore.isOver = true;
                };
                state.catalogItems.items = state.catalogItems.items.concat(action.payload);
                state.loadMore.status = IDLE;
            })
            .addCase(getMoreItemsById.rejected, (state) => {
                state.loadMore.status = ERROR;
            })
            .addCase(searchItem.pending, (state) => {
                state.catalogItems.status = PENDING;
            })
            .addCase(searchItem.fulfilled, (state, action) => {
                console.log(action.payload);
                if (action.payload.length < 6 || action.payload.length === 0) {
                    state.loadMore.isOver = true;
                };
                if (state.loadMore.offset === 12) {
                    state.catalogItems.items = action.payload;
                } else {
                    state.catalogItems.items = state.catalogItems.items.concat(action.payload);
                }
                state.catalogItems.status = IDLE;
            })
            .addCase(searchItem.rejected, (state) => {
                state.catalogItems.status = ERROR;
            })
            .addCase(getItemById.pending, (state) => {
                state.selectedItem.status = PENDING;
            })
            .addCase(getItemById.fulfilled, (state, action) => {
                state.selectedItem.item = action.payload;
                state.selectedItem.status = IDLE;
            })
            .addCase(getItemById.rejected, (state) => {
                state.selectedItem.status = ERROR;
            })
            .addCase(postItems.pending, (state) => {
                state.cart.status = PENDING;
            })
            .addCase(postItems.fulfilled, (state) => {
                state.cart.items = [];
                state.cart.status = IDLE;
                addInStorage(state.cart.items);
                state.cart.orderAccepted = true;
            })
            .addCase(postItems.rejected, (state) => {
                state.cart.status = ERROR;
            })
    }
});

export const { setData, setActiveCategory, upOffset, input, resetOffset, initStorage, addToCart, removeFromCart, resetCart } = appSlice.actions;

export default appSlice.reducer;
