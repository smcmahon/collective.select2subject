# -*- coding: UTF-8 -*-
from Products.CMFCore.utils import getToolByName
from Products.Five.browser import BrowserView

import cgi
import json


class Tags(BrowserView):
    """ Support view for select2subject.
        Returns Subject tags in json
    """

    def __call__(self):
        """ return json list of subjects
        """

        self.request.response.setHeader("Content-type", "application/json; charset=utf-8")

        catalog = getToolByName(self.context, 'portal_catalog')
        tags = catalog.uniqueValuesFor('Subject')
        tags = [cgi.escape(tag) for tag in tags]
        tags = [{'id': tag, 'text': tag} for tag in tags]

        return json.dumps(tags)
