from django.forms import widgets

from wagtail.telepath import register
from wagtail.widget_adapters import WidgetAdapter


class AdminAutoHeightTextInput(widgets.Textarea):

    def __init__(self, attrs=None):
        # Use more appropriate rows default, given autoheight will alter this anyway
        default_attrs = {
            "rows": 1,
            "data-controller": "w-autosize",
            "data-w-autosize-target": "textarea",
        }
        if attrs:
            default_attrs.update(attrs)

        # add a w-field__autosize classname
        try:
            default_attrs["class"] += " w-field__autosize"
        except KeyError:
            default_attrs["class"] = "w-field__autosize"

        super().__init__(default_attrs)
