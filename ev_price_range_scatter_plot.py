!pip install pandas altair vega_datasets

# Import libraries
import pandas as pd
import altair as alt
from vega_datasets import data

# Load data
df = pd.read_csv('Electric Vehicle Population Data.csv')

# Create scatter plot
scatter_plot = alt.Chart(df).mark_point().encode(
    x='Electric Range:Q',  
    y='Base MSRP:Q',  
    color='Model Year:O',  
    size='Electric Vehicle Type:O',  
).properties(
    title="Electric Vehicle Population Analysis"
)

# Show plot
scatter_plot.show()
