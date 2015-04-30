/* select2subject.js */

jQuery(function ($) {
    var ta = $("#form-widgets-IDublinCore-subjects");

    function selectFromTextArea(ta, select_id, data) {
        var selected = ta.text().split(/ *\n+ */),
            options = '',
            i,
            select_tag,
            option;

        ta.hide();

        for (i=0; i < selected.length; i++) {
            option = selected[i];
            if (option.length > 0) {
                options += '<option value="' + option + '" selected="selected">' + option + '</option>';
            }
        }
        select_tag = '<select id="' + select_id + '" multiple="multiple" >' + options + '</select>'
        ta.before(select_tag);
        $('#' + select_id).select2({
            data: data,
            tags: true,
            width: "50%",
            tokenSeparators: [',', ':', '/', '.'],
            placeholder: "Select tags or type new ones"
        });
        $('#' + select_id).on('change', function (e) {
            ta.html($('#' + select_id).val().join('\n'));
        });
    }

    if (ta.length > 0) {
        $.getJSON("./s2s-tags", function( data ) {
            selectFromTextArea(ta, 'ta_s2s', data);
        });
    }

});