from math import radians, cos, sin, asin, sqrt

from unicodedata import decimal


def calculateDistance(lat1:decimal,lat2:decimal,lon1:decimal,lon2:decimal)-> decimal:
    """Calculate the distance between two locations."""
    lon1 = radians(lon1)
    lon2 = radians(lon2)
    lat1 = radians(lat1)
    lat2 = radians(lat2)
      
    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
 
    c = 2 * asin(sqrt(a))
    
    # Radius of earth in miles
    r = 3956
      
    return(c * r)
'''______________________________________________________________________________________'''