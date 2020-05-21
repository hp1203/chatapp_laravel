@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">Users</div>

                <div class="card-body">
                    <ul class="list-group" style="max-height: 500px; overflow:scroll">
                        <li class="list-group-item">
                            <strong>Himanshu Purohit</strong><span
                                class="badge badge-Secondary float-right">Online</span>
                            <br>
                            <span>Last Message</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card" style="height: 550px">
                {{-- <div class="d-flex flex-grow-1 align-items-center justify-content-center">
                    <h4>Select user to start conversation</h4>
                </div> --}}
                <div class="card-header">
                    <h4>Chat <span class="badge badge-pill badge-primary float-right">@{{typing}}</span></h4>
                </div>
                <div class="card-body pb-2" style="overflow-x: scroll" v-chat-scroll>
                    <ul class="list-group">
                        <message v-for="value,index in chat.message" :key=index :color=chat.color[index]
                            :time=chat.time[index] :user=chat.user[index]>
                            @{{value}}
                        </message>
                    </ul>
                </div>
                <div class="card-footer d-inline-flex">
                    <input type="text" name="message" placeholder="Type your message..." class="form-control"
                        v-model='message' @keyup.enter='send'>
                    <button type="button" class="btn btn-primary ml-2">Send</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection