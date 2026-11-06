let categorylist = document.getElementById('categoryList')
fetch('/api/categories')
    .then(response => response.json())
    .then(categories => {
      categories.forEach(function(category) {

            const li = document.createElement('li')
            const link = document.createElement('a')

            link.textContent = category.categoryName

            link.href = '/bank/category/' +
                encodeURIComponent(category.categoryName)

            li.appendChild(link)
            categoryList.appendChild(li)
        })
    })
    .catch(error => console.log(error))
