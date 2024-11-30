import altair as alt
import pandas as pd

# Load data
data = pd.read_csv("Electric Vehicle Population Data.csv")

# Create Altair scatter plot
scatter_plot = alt.Chart(data).mark_circle(size=60).encode(
    x=alt.X('BaseMSRP', title='Base MSRP ($)', scale=alt.Scale(zero=False)),
    y=alt.Y('Electric Range', title='Electric Range (miles)', scale=alt.Scale(zero=False)),
    color=alt.Color('Make', title='Vehicle Make'),
    tooltip=['Make', 'Model', 'BaseMSRP', 'Electric Range']
).properties(
    title='Electric Vehicle Price vs. Range',
    width=800,
    height=500
).interactive()  # Adding zooming and panning

# Saving as HTML file
scatter_plot.save("ev_price_scatter_plot.html")
