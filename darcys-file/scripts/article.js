'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// RESPONSE:  The purpose of this function is to list/organize the vendors articles. The name is capitalized to indicate it is a constructor function. "rawDataObj" represents the parameter being passed into this function.

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
this.title = rawDataObj.title;
this.category = rawDataObj.category;
this.author = rawDataObj.author;
this.authorUrl= rawDataObj.authorUrl;
this.publishedOn = rawDataObj.publishedOn;
this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // RESPONSE:  Not sure... 1) "a convenient way to duplicate elements on a page", 2) typically, if data is being moved from one place to the other on the DOM, data would be removed from the original location in order to append to the new location - with clone, the original info doesn't need to be removed?

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $newArticle.removeClass('template');


  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */
  $newArticle.find('.byline a').text(this.author);
  $newArticle.find('.byline a').attr('href', 'this.authorURL').html(this.authorURL);
  $newArticle.find('.title').html(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('.byline time').attr('datetime', 'this.publishedOn');

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.
rawData.forEach(function(element) {
  articles.push(new Article(element));
});

articles.forEach(function(appendArticle) {
  $('#articles').append(appendArticle.toHtml());
});
