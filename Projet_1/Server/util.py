import json
import pickle
import numpy as np

__Area = None
__data_columns = None
__model = None

def get_estimated_price(Area,housetype,sqft,bed,bath,recpt):
    try:
        loc_index = __data_columns.index(Area.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = housetype
    x[1] = sqft
    x[2] = bed
    x[3] = bath
    x[4] = recpt
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)

def get_area_names():
    return __Area

def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns
    global __Area

    with open("./Artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __Area = __data_columns[5:]

    global __model
    with open("./Artifacts/London_property_prices_prediction.pickle", 'rb') as f:
        __model = pickle.load(f)

    print("loading saved artifacts...done")

if __name__ == "__main__":
    load_saved_artifacts()
    print(get_area_names())
    print(get_estimated_price('SW11',2,1000,2,2,2))
    print(get_estimated_price('SW11', 3, 1000, 2, 2, 2))
    print(get_estimated_price('e1w', 2, 1000, 2, 2, 2))