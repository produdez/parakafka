import argparse
import uuid
from utils import plot_util
from utils import mongo_util
from utils import logging_util
from utils import folder_util

import throughput_calc
import example_test

import pandas as pd
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

TESTS = {
    0 : 'all_tests',
    1 : 'throughput_calc',
    2 : 'example_test',
}
LINE_SEP = '....................................'

def init_argparse(id):
    parser = argparse.ArgumentParser(
        usage="%(prog)s [OPTIONs]",
        description=
            '''
                Helper for test, calc and plotting for kafka report
            ''',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )

    # * Required

    # * Optionals
    parser.add_argument('-collection', type=str, default='test_collection', help='name of collection to interact with')
    parser.add_argument('-column', type=str, default='data', help='name of column to interact with')
    parser.add_argument('-output', type=str, default='output', help='output folder (relative to current working directory)')
    parser.add_argument('-sub-folder', type=bool, default=True, help='create a sub-folder in output folder each run?')
    parser.add_argument('-runtime-id', type=str, default=f'{id}', help='random generated runtime id')
    parser.add_argument('-plot-collection', type=bool, default=True, help='plot collection at run time?')
    parser.add_argument('-log', type=bool, default=True, help='Log runtime into a log file?')
    parser.add_argument('-throughput-interval', type=int, default=10000, help='time interval (msec) to calculate throughput')
    return parser

def choose_test():
    print('Select test by number')
    print(TESTS)

    choice = int(input())
    if not (choice in TESTS):
        raise ValueError('Invalid test number')
    print(f'Chosen test: {TESTS[choice]}, number: {choice}')
    return choice

# ! IMPORTANT ***
def run_one_test(test_number, data, args, output_folder, runtime_id):
    test_name = TESTS[test_number]

    #* set variables for function
    if test_name is TESTS[1]:
        func_name = 'calc'
        argv = {
            'throughput_interval' : args.throughput_interval
        }

    if test_name is TESTS[2]: # example test
        # * main func name of test
        func_name = 'main_func'
        # * extra args (exclude defaults)
        argv = {
            'just for readability' : 1,
            'the name does not matter' : 'string',
            'cause it is not used' : True,
        }

    #* set default args for every call (last args)
    argv['runtime_id'] = runtime_id
    argv['output_folder'] = output_folder
    # * calling (note that data is defaulted first arg)
    exec_string = f'{test_name}.{func_name}(data,*{list(argv.values())})'
    print('Executing: ', exec_string)
    exec(exec_string)


# ! ..............................................
def main():
    # * used in case user does not pass in their own id
    random_gen_uuid = str(uuid.uuid4())[:8]

    # * args
    parser = init_argparse(id = random_gen_uuid)
    args = parser.parse_args()
    print('Current arguments:')
    print(args)
    print(LINE_SEP)

    # * process some args
    runtime_id = args.runtime_id
    if args.sub_folder is True:
        output_folder = f'{args.output}/{runtime_id}'
    else:
        output_folder = args.output

    # * connect_mongodb and get df
    mongo_connection = mongo_util.connect_mongodb()
    client = mongo_connection['client']
    db = mongo_connection['db']
    collection = mongo_connection['collection']
    data = pd.DataFrame( list(collection.find({})))
    print('Current data count: ', data.shape[0])

    # * choose tests
    test_num = choose_test()
    print(LINE_SEP)

    # * Create output folder
    if folder_util.check_and_create_directory(output_folder):
        print(LINE_SEP)
    
    # * setup log file
    logging_util.start(output_folder,runtime_id, test_num, args)

    # * run tests
    if test_num == 0: #all test
        for num in list(TESTS.keys())[1:]:
            print(LINE_SEP)
            run_one_test(num, data, args, output_folder, runtime_id)
    else: # run a specific test
        run_one_test(test_num, data, args, output_folder, runtime_id)
    print(LINE_SEP)

    # * plot collection
    if args.plot_collection is True:
        print('Plotting histogram of data')
        plot_util.hist_plot_collection(data,collection.name,args.column,output_folder, runtime_id)
        print(LINE_SEP)

    # * clean up
    logging_util.end()
if __name__ == '__main__':
    main()