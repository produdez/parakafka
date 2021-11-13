import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from utils import plot_util

TIME_COLUMNS = ['timestamp_kafka', 'timestamp_db', 'timestamp_producer']

def calc(data, throughput_interval, runtime_id, output_folder):
    print('Calculating throughput for: ', TIME_COLUMNS)
    print('Throughput interval: ', throughput_interval, 'ms')
    time_data = process_data(data)
    # print(time_data.head())

    for column_name in TIME_COLUMNS:
        column = time_data[column_name]
        start = column.min()
        end = column.max()

        # group by output interval segments and calculate throughput
        column = column.groupby(pd.cut(column, np.arange(start, end, throughput_interval))).count()
        throughput = column/(throughput_interval/1000)

        # print output
        print('<>____________________')
        print(f'Throughput stats for: {column_name}')
        print(throughput.describe())
        # plot
        plot_util.line_plot(column, f'thoughput_{column_name}',output_folder, runtime_id)


def process_data(data):
    time_data = data[TIME_COLUMNS]
    time_data = time_data.astype(np.int64)
    start_time = time_data.min().min()
    time_data = time_data - start_time
    return time_data