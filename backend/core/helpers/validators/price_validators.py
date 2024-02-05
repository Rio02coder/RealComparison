

def validate_price(value: float) -> float:
    """Validate the price. [non-negative]"""
    if value < 0.0:
        return 0.0
    return value
'''______________________________________________________________________________________'''