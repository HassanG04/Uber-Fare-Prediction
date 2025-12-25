import joblib
import pandas as pd
import numpy as np

from xgboost import XGBRegressor
from skl2onnx import to_onnx, update_registered_converter
from skl2onnx.common.shape_calculator import calculate_linear_regressor_output_shapes
from onnxmltools.convert.xgboost.operator_converters.XGBoost import convert_xgboost

# Register converter for XGBRegressor so it can be converted inside sklearn Pipeline
update_registered_converter(
    XGBRegressor,
    "XGBoostXGBRegressor",
    calculate_linear_regressor_output_shapes,
    convert_xgboost,
)

pipe = joblib.load("model.joblib")

# One-row DataFrame to define schema (names + types)
sample = pd.DataFrame([{
    "Car Condition": "Good",
    "Weather": "Clear",
    "Traffic Condition": "Low",
    "pickup_longitude": 0.0,
    "pickup_latitude": 0.0,
    "dropoff_longitude": 0.0,
    "dropoff_latitude": 0.0,
    "passenger_count": 1.0,
    "hour": 12.0,
    "day": 1.0,
    "month": 1.0,
    "weekday": 1.0,
    "year": 2025.0,
    "jfk_dist": 0.0,
    "ewr_dist": 0.0,
    "lga_dist": 0.0,
    "sol_dist": 0.0,
    "nyc_dist": 0.0,
    "distance": 0.0,
    "bearing": 0.0,
}])

# Cast numeric columns to float32 (helps avoid dtype issues)
cat_cols = {"Car Condition", "Weather", "Traffic Condition"}
for c in sample.columns:
    if c not in cat_cols:
        sample[c] = sample[c].astype(np.float32)

onx = to_onnx(pipe, sample, target_opset={"": 12, "ai.onnx.ml": 2})

with open("model.onnx", "wb") as f:
    f.write(onx.SerializeToString())

print("Saved model.onnx")
