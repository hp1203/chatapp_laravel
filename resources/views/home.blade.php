@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-12"><a href='' class="btn btn-warning btn-sm float-right mb-2"
                @click.prevent='deleteSession'>Delete
                Chats</a></div>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">Users (Online: @{{numberOfUser}})</div>
                <div class="card-body">
                    <ul class="list-group" style="max-height: 500px; overflow:scroll">
                        @foreach ($users as $user)
                        <li class="list-group-item">
                            <strong>{{ ucfirst($user->name) }}</strong>
                            <span class="badge badge-warning float-right"
                                v-text="{{$user->id}} | isOnline">Online</span>
                            <br>
                            <small>{{ $user->email }}</small>
                        </li>
                        @endforeach
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