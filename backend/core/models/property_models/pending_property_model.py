from .property_model import Property


class PendingProperty(Property):
    """ 
        A subclass of the original property model. It represents the properties that are requested 
        to be added in the app. Pending Properties has been saperated to 
        a different model to distinguish them from the approved propertoes.
    """       
'''______________________________________________________________________________________'''