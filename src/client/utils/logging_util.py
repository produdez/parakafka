import sys

file = None

class Tee(object):
    def __init__(self, *files):
        self.files = files
    def write(self, obj):
        for f in self.files:
            f.write(obj)
            f.flush() # If you want the output to be visible immediately
    def flush(self) :
        for f in self.files:
            f.flush()

def start(output_path, runtime_id, test_choice, runtime_arguments):
    file_name = f'{output_path}/log_{runtime_id}.log'
    f = open(file_name, 'w')
    sys.stdout = Tee(sys.stdout, f)
    
    f.write(f'runtime_id: {runtime_id}\n')
    f.write(f'Test choice: {test_choice}\n')
    f.write(f'Runtime arguments: {runtime_arguments}\n')

    global file
    file = f

def end():
    sys.stdout = sys.__stdout__

    global file
    file.close()