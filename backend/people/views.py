from rest_framework import viewsets

from .models import Person
from .serializers import *

class PersonView(viewsets.ModelViewSet):
    serializer_class = PersonSerializer
    queryset = Person.objects.all()

# @api_view(['GET', 'POST'])
# def person_list(request):
#     """ List persons or create new person """
#     if request.method == "GET":
        