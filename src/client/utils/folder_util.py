import os
import errno

def check_and_create_directory(directory_relative_path):
    current_dir = os.path.dirname(os.path.dirname(__file__))
    abs_path = current_dir.replace('\\', '/') + '/' + directory_relative_path
    if not os.path.exists(abs_path):
        try:
            os.makedirs(abs_path)
            print(f'New directory created: {abs_path}')
            return True
        except OSError as exc: # Guard against race condition
            if exc.errno != errno.EEXIST:
                raise
    return False