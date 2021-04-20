var dataObject = JSON.parse(items.json);
var listItemString = $('#listItem').html();

dataObject.forEach(buildNewList);

function buildNewList(item, index) {
  var listItem = $('<li>' + listItemString + '</li>');
  var listItemTitle = $('.title', listItem);
  listItemTitle.html(item.name);
  var listItemAmount = $('.amount', listItem);
  listItemAmount.html(item.buyNowPrice);
  var listItemDesc = $('.description', listItem);
  listItemDesc.html(item.buyAskingPrice);
  $('#dataList').append(listItem);
}