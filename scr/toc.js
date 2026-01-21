function execute(input) {
    var doc = Html.parse(input.responseBody);
    var novelTitle = doc.select("h1.entry-title").text();
    
    var novelCover = doc.select("img.wp-post-image").first().attr("src");
    if (!novelCover) novelCover = "";
    
    var author = doc.select(".post-meta .author").text() || "";
    
    var intro = "";
    var introElement = doc.select(".entry-content p").first();
    if (introElement) intro = introElement.text();
    
    var $chapList = doc.select("ul.wp-block-list li a");
    
    var novel = {
        summary: intro,
        status: NovelStatus.UNKNOWN,
        cover: novelCover,
        title: novelTitle,
        author: author
    };
    
    var chapterList = [];
    
    for (var i = 0; i < $chapList.size(); i++) {
        var e = $chapList.get(i);
        chapterList.add(new Chapter(e.text(), e.attr("href")));
    }
    
    return Response.success(novel, chapterList);
}
