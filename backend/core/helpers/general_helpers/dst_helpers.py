from typing import List


## Dictionary
def dict_has_required_fields(dictionary, *args) -> bool:
    """Tests dictionary data has required fields."""
    for field in args:
        if not field in dictionary:
            return False
    return True
'''______________________________________________________________________________________'''

## List
def list_of_fields_are_valid(input_list: List[str], compare_list: List[str], *args) -> bool:
    """Tests whether every field in input_list is in the compare_list. 
        Optional args can be passed for fields that should NOT appear in the input_list."""
    for field in input_list:
        if not field in compare_list or field in args:
            return False
    return True
'''______________________________________________________________________________________'''