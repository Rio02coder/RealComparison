import json


class FilterTester:
    """
        Helper class for testing operations related to filtering properties.
    """
    ## Filter validators
    def validate_range_filter(self,request_url: str, key:str, min_r:int, max_r:int) -> None:
        response = self.client.get(request_url, **self.headers)
        self.assertEqual(response.status_code, 200)
        for property in json.loads(response.content):
            self.assertTrue(property[key] in range(min_r,max_r))

    def validate_boolean_filter(self,request_url: str, key:str, value:bool) -> None:
        response = self.client.get(request_url, **self.headers)
        self.assertEqual(response.status_code, 200)
        for property in json.loads(response.content):
            self.assertTrue(property[key] == value)

    def validate_ordering_filter(self,request_url: str, key:str) -> None:
        response = self.client.get(request_url, **self.headers)
        self.assertEqual(response.status_code, 200)
        properties = []
        for property in json.loads(response.content):
            properties.append(property[key])
        is_ordered = self.is_assending(properties) or self.is_descending(properties)
        self.assertTrue(is_ordered)

    def validate_string_matching_search(self, request_url: str, key:str, keyword:str, lookup:str) -> None:
        response = self.client.get(request_url, **self.headers)
        self.assertEqual(response.status_code, 200)
        for property in json.loads(response.content):
            if lookup == 'exact':
                self.assertTrue(property[key] == keyword)
            else:
                self.assertTrue(keyword in property[key])
    '''______________________________________________________________________________________'''

    ## Filter chekcers
    def is_assending(self, values:list) -> bool:
        return all(values[i] <= values[i+1] for i in range(len(values) - 1))

    def is_descending(self, values:list) -> bool:
        return all(values[i] >= values[i+1] for i in range(len(values) - 1))
    '''______________________________________________________________________________________'''

    ## Filter customizers
    def customize_filter_url(self, url_paramters: dict) -> str:
        request_url = self.url + '?'
        counter = 0
        for key in url_paramters:
            counter+=1
            if url_paramters[key] == True:
                request_url = request_url + 'q=' + key
            else:
                request_url = request_url + key

            if counter < len(url_paramters):
                request_url = request_url + '&'
        return request_url
'''______________________________________________________________________________________'''
