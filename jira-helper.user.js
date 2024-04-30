// ==UserScript==
// @name         Jira helper
// @namespace    http://tampermonkey.net/
// @version      2024-04-30
// @description  try to take over the world!
// @author       You
// @match        https://**.atlassian.net/browse/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    // listen shortcut
    const ticket = {
        id:'[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"] span',
        title: '[data-testid="issue.views.issue-base.foundation.summary.heading"]',
        type: '[data-testid="issue.views.issue-base.foundation.change-issue-type.button"] img'
    }

    const getDom= (selector)=>document.querySelector(selector)

    window.addEventListener('keypress',(e)=> {
        if(e.ctrlKey && e.keyCode === 46) {
            let type = getDom(ticket.type).getAttribute('alt');
            const id = getDom(ticket.id).innerText;
            const title = getDom(ticket.title).innerText;

            if(type.toLowerCase().includes('bug')){
                type ='fix'
            } else {
                type ='feature'
            }

            navigator.clipboard.writeText(`[${id}]${title}`);

            setTimeout(()=> {
                navigator.clipboard.writeText(`${type}/${id.toLowerCase()}-${title.toLowerCase().split(' ').join('-')}`);
            },500)

            const toast = document.createElement('div');

            toast.innerHTML = 'Branch name generated & copied'
            toast.style.cssText=`
            display: block;
            position:fixed;
            top:58px;left: 50%;
            transform:translateX(-50%);
            background-color:#4BCE97;
            color: rgb(29, 33, 37);
            padding: 10px 20px;
            border-radius: 4px;
            box-shadow: 0px 1px 4px rgba(0,0,0,0.5);
            z-index:10000;
            font-weight: bold;
            `;

            document.body.appendChild(toast);

            setTimeout(()=> {
               document.body.removeChild(toast)
            }, 3000)

        }
    })


})();

