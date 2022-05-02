package com.sjsuhub.security;

import org.apache.commons.lang.StringEscapeUtils;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

public class SecurityEscape {

    public static String sanitizeString(String arg0) {
        return Jsoup.clean(
                StringEscapeUtils.escapeHtml(StringEscapeUtils.escapeJavaScript(StringEscapeUtils.escapeSql(arg0)))
                , Whitelist.basic());
    }

}

