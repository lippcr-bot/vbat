function execute(input) {
    var doc = Html.parse(input.responseBody);
    
    doc.select("nav, .post-meta, .related").remove();
    doc.select("h1.entry-title").remove();
    
    var chapterTitle = doc.select("h2, h3").first().text() || "";
    
    var content = doc.select(".entry-content").html();
    
    return Response.success(content, chapterTitle);
}
