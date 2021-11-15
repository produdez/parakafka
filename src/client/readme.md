# RUN

```
python main.py
```
**Run `-h` for help**

## Notes

- The actual algorithm, tests, statistics, calculations are in `./tests`
- `main.py` is just CLI
- utility are in `./utils`, most of which you do not need to know except `plot_util.py`
- All plotting should be done through `plot_util.py`

## About how to add tests (IMPORTANT)

Don't forget to import the test file ofc.

1. Add the test's `filename` into `TESTS` constant at the start of the `main.py` file
2. Add the file into  `./tests`, note that one test only have one main function
    - Ex: `example_test.py`'s main function is called `main_func`
3. Make sure that main function have:
    - first argument is for data (dataframe)
    - two arguments at the **END** (two last args) for `runtime_id` and `output_folder`
4. Add main function name and the extra arguments into the function `run_one_test` in `main.py`
   - Ex: How i added my `example_test` test

    ```python
    if test_name is TESTS[2]: # example test
        # * main func name of test
        func_name = 'main_func'
        # * extra args (exclude defaults)
        argv = {
            'just for readability' : 1,
            'the name does not matter' : 'string',
            'cause it is not used' : True,
        }
    ```

    - Note that the `argv` here must be in order and also **Exclude** the arguments mentioned in `STEP 3`

5. If you get lost, sorry for my messy code, you can:
   - Check out `main.py`, especially the `run_one_test` function
   - Check out the example code for `example_test.py` and `throughput_calc.py`
