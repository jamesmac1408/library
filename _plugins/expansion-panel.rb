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

            output = "<div class=\"panel-container\"><button class=\"panel-cta\"><span class=\"panel-title\">#{title}</span>"
            output += "<div class=\"title-icon\"><svg fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z\"/> <path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg></div>"
            output += "</button>"
            output += "<div class=\"panel-body\"><div class=\"body-content\">#{_output}</div></div></div>"

            output
        end
    end
end

Liquid::Template.register_tag('panel', Jekyll::ExpansionPanel)