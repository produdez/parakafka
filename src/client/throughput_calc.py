import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
from utils import plot_util

TIME_COLUMNS = ['timestamp_kafka', 'timestamp_db', 'timestamp_producer']

def calc(data, throughput_interval, runtime_id, output_folder, collection):
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

    # count loss

    prod_id_list = [i['_id'] for i in list(collection.aggregate([ {"$group" : {"_id":"$producer_id"}} ]))]
    print('\n<>______START COUNT LOSS__________')
    print(f'Producer IDs:')
    for index, val in enumerate(prod_id_list):
        print(f'{index+1}. {val}')
    for index, prod_id in enumerate(prod_id_list):
        dataListOfProd = [i for i in list(collection.find({"producer_id": prod_id}))]
        toTestList = [i['sequence_num'] for i in dataListOfProd]
        print(f'PRODUCER {index+1}. {toTestList}')
        print(f'PRODUCER {index+1}. First sent at {datetime.fromtimestamp(dataListOfProd[0]["timestamp_producer"]/1000)}, loss {countLoss(toTestList)} packet(s)' )
    print('<>______END COUNT LOSS__________\n')

    


def process_data(data):
    time_data = data[TIME_COLUMNS]
    time_data = time_data.astype(np.int64)
    start_time = time_data.min().min()
    time_data = time_data - start_time
    return time_data

def countLoss(seqList):
    seqList.sort()
    l = len(seqList)
    i = 0
    numLoss = 0
    curSeqNum = seqList[0]
    for i in range(0, l-1):
        numLoss = numLoss + seqList[i+1] - (curSeqNum + 1)
        curSeqNum = seqList[i+1]

    return numLoss
