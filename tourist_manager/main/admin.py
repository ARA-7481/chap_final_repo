from django.contrib import admin

from .models import Vehicle, Tourist, LogDetails, Rates
from accounts.models import Profile

class LogDetailsAdmin(admin.ModelAdmin):
    list_display = ('log_code', 'date', 'time', 'added_by')
    search_fields =  ('log_code', 'date', 'time', 'added_by')

admin.site.register(Vehicle)
admin.site.register(Tourist)
admin.site.register(LogDetails, LogDetailsAdmin)
admin.site.register(Profile)
admin.site.register(Rates)