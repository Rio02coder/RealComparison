from http import HTTPStatus

import aenum


"""
    Extends the HTTPStatus enum from the http library with custom status codes.
    Make sure to import HTTPStatus from this class if your file is using the custom status codes.
    Unfortunately, the enum is extended at runtime so there will not be any autocompletion for the custom codes.
"""

aenum.extend_enum(HTTPStatus, 'UNNECESSARY_OPERATION', 419, 'Operation is unnecessary since server is already in the requested state.')
aenum.extend_enum(HTTPStatus, 'UNVERIFIED_PROPERTY', 432, 'Cannot apply requested operation on an unverified property.')
aenum.extend_enum(HTTPStatus, 'UPLOAD_LIMIT_REACHED', 433, 'The maximum number of uploaded files is reached')