import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def hist_plot_collection(data, collection_name, column_name, output_location, runtime_id, title = None, xlabel = None, ylabel = None): #title, xlabel, ylabel
    sns.histplot(data=data, x=column_name)
    if (title != None):
        plt.title(title)
    if (xlabel != None):
        plt.xlabel(xlabel)
    if (ylabel): 
        plt.ylabel(ylabel)
    plot_output_path = f'{output_location}/histplot_{column_name}_{collection_name}_{runtime_id}.png'
    plt.savefig(plot_output_path)
    plt.clf()
    print('plotted: ', plot_output_path)

def line_plot(data,name, output_location, runtime_id, title = None, xlabel = None, ylabel = None): #title, xlabel, ylabel
    plt.plot(data)
    if (title != None):
        plt.title(title)
    if (xlabel != None):
        plt.xlabel(xlabel)
    if (ylabel): 
        plt.ylabel(ylabel)
    plot_output_path = f'{output_location}/lineplot_{name}_{runtime_id}.png'
    plt.savefig(plot_output_path)
    plt.clf()
    print('plotted: ', plot_output_path)


