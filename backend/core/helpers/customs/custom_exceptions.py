''' 
    Custom exceptions for error handling.
'''
class InvalidCredentialsError(Exception):
    """
        An exception to be raised when credentials are invalid.  
    """
    pass

class MissingOAuthDataError(Exception):
    """
        An exception to be raised when an OAuth provider does not return all required data.   
    """
    pass

class UnknownOAuthError(Exception):
    """
        An exception to be raised when something unknown has gone wrong with an OAuth provider.   
    """
    pass

class ExpiredTokenError(Exception):
    """
        An exception to be raised when a token has expired. 
    """
    pass

class InvalidSerializerMethodError(Exception):
    """
        An exception to be raised when a serializer's method should not be used.   
    """
    pass