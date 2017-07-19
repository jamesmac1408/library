module Jekyll
    class ExpansionPanel < Liquid::Block
        def initialize(tag_name, markup, tokens)
            @markup = markup
            super
        end

        def render(context)

            site        = context.registers[:site]
            converter   = site.find_converter_instance(::Jekyll::Converters::Markdown)
            _output     = converter.convert(super(context))

            title = @markup
            if (@markup.length == 0)
                title = "Readme"
            end

            output = "<div class=\"panel-container expanded\"><button class=\"panel-cta\"><span class=\"panel-title\">#{title}</span></button>"
            output += "<div class=\"panel-body\"><div class=\"body-content\">#{_output}</div></div></div>"

            output
        end
    end
end

Liquid::Template.register_tag('panel', Jekyll::ExpansionPanel)