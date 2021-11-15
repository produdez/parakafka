#for plotting
from utils import plot_util

def main_func(data, extra_arg1, extra_arg2, extra_arg3, runtime_id, output_folder):
    print('Running example_test')
    print('Default args: ')
    print('data: ', data.head())
    print('runtime_id: ', runtime_id)
    print('output_folder: ', output_folder)
    print('Other args: ', extra_arg1, extra_arg2, extra_arg3)

    #example plot
    plot_util.line_plot(data['data'], f'test_plot',output_folder, runtime_id)
    pass